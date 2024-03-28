import React, { useState } from "react";
import { Error, Form, Input, Wrapper } from "./Auth";
import { FirebaseError } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../routes/Firebase";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === null) return;
    try {
      setLoading(true);
      if (auth.currentUser?.email) {
        await sendPasswordResetEmail(auth, email);
        navigate("/login");
      } else {
        setError("이메일을 확인해 주세요");
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <h1>이메일을 입력해주세요</h1>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          value={email}
          type="email"
          placeholder="Email"
          required
        />
        <Input
          type="submit"
          placeholder="전송"
          value={loading ? "Loading" : "Send"}
        />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}

export default ChangePassword;

// // import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
// // import { auth } from "../routes/Firebase";
// import React, { useState } from "react";
// import { Form, Input, Wrapper } from "./Auth";

// function ChangePassword() {
//   const [email, setEmail] = useState("");
//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const {
//       target: { value },
//     } = e;
//     setEmail(value);
//   };
//   //   const changePassword = async () => {
//   //     try {
//   //       await sendPasswordResetEmail(auth, auth.currentUser?.email);
//   //     } catch (e) {
//   //       console.log(e);
//   //     }
//   //   };
//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(e);
//   };
//   return;
//   <Wrapper>
//     <Form onSubmit={onSubmit}>
//       <Input
//         onChange={onChange}
//         value={email}
//         placeholder="Email"
//         type="email"
//         required
//       />
//       <Input type="submit" placeholder="확인" value={"Log in"} />
//     </Form>
//   </Wrapper>;
// }

// export default ChangePassword;
