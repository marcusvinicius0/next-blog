"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  blog: any;
};

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function BlogLike({ blog }: Props) {
  const { data, status } = useSession();
  const [likes, setLikes] = useState(blog?.likes);

  const router = useRouter();
  const pathname = usePathname();

  // @ts-ignore
  const isLiked = likes?.includes(data?.user._id);

  const handleLike = async () => {
    if (status !== "authenticated") {
      toast.error("Please login to like this blog");
      router.push(`/login?callbackUrl=${pathname}`);
      return;
    } else {
      try {
        if (isLiked) {
          const answer = window.confirm("Are you sure you want to unlike?");
          if (answer) {
            handleUnlike();
          }
        } else {
          const response = await fetch(`${process.env.API}/user/blog/like`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ blogId: blog?._id }),
          });

          if (!response.ok) {
            toast.error("Failed to like blog");
            throw new Error("Failed to like blog");
          } else {
            const data = await response.json();
            setLikes(data.likes);
            toast.success("Blog liked.");
            router.refresh();
          }
        }
      } catch (err) {
        console.log(err);
        toast.error("Error liking blog");
      }
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/blog/unlike`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blogId: blog?._id }),
      });

      if (!response.ok) {
        toast.error("Failed to unlike blog.");
        throw new Error("Failed to unlike blog.");
      } else {
        const data = await response.json();
        setLikes(data.likes);
        toast.success("Blog unliked.");
        router.refresh();
      }
    } catch (err) {
      console.log(err);
      toast.error("Erro unliking blog");
    }
  };

  return (
    <>
      <p className="cursor-pointer">
        <span onClick={handleLike} className="flex flex-row items-center gap-1">
          {isLiked ? (
            <AiFillHeart className="text-red-600" />
          ) : (
            <AiOutlineHeart />
          )}{" "}
          {likes?.length} {likes?.length > 1 ? "likes" : "like"}
        </span>
      </p>
    </>
  );
}
