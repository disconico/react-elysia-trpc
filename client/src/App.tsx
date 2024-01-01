import * as React from "react";

import { api } from "./trpc";

const App = () => {
  const [name, setName] = React.useState("");

  const { data, isLoading, refetch } = api.user.getUsers.useQuery();

  const { data: posts } = api.post.getPosts.useQuery()
  if(posts) console.log(posts);


  // if (data) console.log(data);

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
      {posts && <ul>
        <li key={posts.id}>
          {posts.author} - {posts.message} - {posts.createdAt}
        </li>
      </ul>}
    </div>
  );
};

export default App;
