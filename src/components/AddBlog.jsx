"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  RsetBlogContent,
  RsetBlogTitle,
  selectBlogContent,
  selectBlogTitle,
  RsetFormErrors,
  selectFormErrors,
} from "@/slices/mainSlices";
import { errorMessage, successMessage } from "@/lib/toast";

const AddBlog = ({ id }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const blogTitle = useSelector(selectBlogTitle);
  const blogContent = useSelector(selectBlogContent);
  const formErrors = useSelector(selectFormErrors);

  const blogTitleIsValid = blogTitle !== "";
  const blogContentIsValid = blogContent !== "";
  const blogFormIsValid = blogTitleIsValid && blogContentIsValid;

  const validation = () => {
    var errors = {};
    if (!blogTitleIsValid) {
      errors.blogTitle = "Title can not be empty please write your title!";
    }
    if (!blogContentIsValid) {
      errors.blogContent = "content can not be empty please write your content!";
    }
    return errors;
  };

  useEffect(() => {
    if (!id) handleReset();
  }, []);

  const postAddBlog = async () => {
    if (blogFormIsValid) {
      try {
        const response = await axios.post("http://localhost:3000/api/posts", {
          title: blogTitle,
          content: blogContent,
        });
        if (response.status === 201) {
          dispatch(RsetBlogContent(""));
          dispatch(RsetBlogTitle(""));
          successMessage("Blog post added successfully");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      } catch (error) {
        errorMessage("Faild to add Blog post");
        console.error("Failed to add blog post:", error);
      }
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            blogTitle,
            blogContent,
          })
        )
      );
    }
  };

  const putBlogPost = async () => {
    if (blogFormIsValid) {
      try {
        const response = await axios.put(`http://localhost:3000/api/posts/${id}`, {
          title: blogTitle,
          content: blogContent,
        });
        if (response.status === 200) {
          dispatch(RsetBlogTitle(""));
          dispatch(RsetBlogContent(""));
          successMessage("Blog post updated successfully");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      } catch (error) {
        errorMessage("Faild to update Blog post");
        console.error("Failed to add blog post:", error);
      }
    } else {
      dispatch(
        RsetFormErrors(
          validation({
            blogTitle,
            blogContent,
          })
        )
      );
    }
  };

  const handleReset = () => {
    dispatch(RsetBlogTitle(""));
    dispatch(RsetBlogContent(""));
    dispatch(RsetFormErrors({}));
    router.replace("/addblog");
  };

  return (
    <div id="addBlogContainer" className="flex justify-center mt-5">
      <form className="w-[50%] flex flex-col gap-2">
        <span>
          <Label htmlFor="title" className="font-bold text-[25px]">
            Title
          </Label>
          <Input
            id="title"
            value={blogTitle}
            onChange={(e) => dispatch(RsetBlogTitle(e.target.value))}
            placeholder="Please write your blog title here ..."
            className="text-black mt-2"
          />
          {!blogTitleIsValid && (
            <p className="text-red-500 text-[13px] mt-1">{formErrors.blogTitle}</p>
          )}
        </span>

        <span>
          <Label htmlFor="content" className="font-bold text-[20px]">
            Content
          </Label>
          <Textarea
            id="content"
            value={blogContent}
            onChange={(e) => dispatch(RsetBlogContent(e.target.value))}
            placeholder="Blog post content ..."
            className="text-black h-[400px] overflow-y-auto mt-2"
            rows={10}
          />
          {!blogContentIsValid && (
            <p className="text-red-500 text-[13px] mt-1">{formErrors.blogContent}</p>
          )}
        </span>
        <span id="actions" className="flex gap-2 justify-end mt-2">
          {!id ? (
            <Button
              variant="secondary"
              onClick={async (e) => {
                e.preventDefault();
                await postAddBlog();
              }}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={async (e) => {
                e.preventDefault();
                await putBlogPost();
              }}
            >
              Update
            </Button>
          )}
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>
        </span>
      </form>
    </div>
  );
};

export default AddBlog;
