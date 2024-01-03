import * as React from "react";

import { api } from "./trpc";

const App = () => {
  const [name, setName] = React.useState("");

  const { data, isLoading, refetch } = api.user.getUsers.useQuery();

  const { data: post } = api.post.getFirstPost.useQuery();
  const { data: comments } = api.comment.getCommentsFromAPost.useQuery(
    { id: post?.id as number},
    {
      enabled: !!post,
    },
  );

  const mutation = api.user.createUser.useMutation({
    onSuccess: () => refetch(),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setName("");
    mutation.mutate({ name });
    event.preventDefault();
  };

  if (isLoading) return <span>Loading ...</span>;

  return (
    <div>
      <ul>
        {(data ?? []).map((user) => (
          <li key={user.id}>
            {user.name} - {user.id}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input id="name" type="text" value={name} onChange={handleChange} />

        <button type="submit">Create</button>
      </form>
      {post && (
        <ul>
          <li key={post.id}>
            {post.author} - {post.message} - {post.createdAt.toLocaleDateString()}
          </li>
        </ul>
      )}
      {comments && (
        <ul>
          {comments.map((com) => (
            <li key={com.id}>
              {com.id} - {com.message} - {com.createdAt.toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
