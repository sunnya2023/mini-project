import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../routes/Firebase";
import Tweet from "./Tweet";
import { Unsubscribe } from "firebase/auth";

export interface ITweet {
  id: string;
  createdAt: number;
  photo?: string;
  tweet: string;
  userId: string;
  username: string;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  /* overflow-y: scroll; */
`;

function Timeline() {
  let unsubscribe: Unsubscribe | null = null;
  const [tweets, setTweet] = useState<ITweet[]>([]);
  useEffect(() => {
    const fetchTweets = async () => {
      const tweetQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25)
      );
      // const snapshot = await getDocs(tweetQuery);
      // const tweets = snapshot.docs.map((doc) => {
      //   const { tweet, createdAt, userId, username, photo } = doc.data();
      //   return {
      //     tweet,
      //     createdAt,
      //     userId,
      //     username,
      //     photo,
      //     id: doc.id,
      //   };
      // });
      unsubscribe = await onSnapshot(tweetQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return {
            tweet,
            createdAt,
            userId,
            username,
            photo,
            id: doc.id,
          };
        });
        setTweet(tweets);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <Wrapper>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} {...tweet} />
      ))}
    </Wrapper>
  );
}

export default Timeline;
