"use client";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";

const LikeEntry = ({
  serverLikes,
  entryId,
  session,
  collectionName = "info",
}) => {
  const router = useRouter();
  const [likes, setLikes] = useState(serverLikes);
  const [emailExist, setEmailExist] = useState(false);

  useEffect(() => {
    const exist = session && likes.includes(session.user.email);
    setEmailExist(exist);
  }, [session, likes]);

  const handleEntryLike = async () => {
    if (session) {
      if (emailExist) {
        setLikes((likes) =>
          likes.filter((liker) => liker !== session.user.email)
        );
        fetch("/api/like-entry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ entryId, like: false, collectionName }),
        }).catch((r) => {
          console.log(r);
          setLikes((likes) => [...likes, session.user.email]);
        });
      } else {
        setLikes((likes) => [...likes, session.user.email]);

        fetch("/api/like-entry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({ entryId, like: true, collectionName }),
        }).catch((r) =>
          setLikes((likes) =>
            likes.filter((liker) => liker !== session.user.email)
          )
        );
      }
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-center">
        <button onClick={handleEntryLike}>
          <AiFillHeart
            style={{
              color: emailExist ? "rgb(239 68 68) " : "rgb(107 114 128)",
            }}
            className=" w-10 h-10 p-2 "
          />
        </button>
        <div>
          {likes ? (
            <p className=" font-medium text-red-600">{likes.length}</p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default LikeEntry;
