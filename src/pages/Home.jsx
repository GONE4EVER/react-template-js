import { useGetUsersQuery } from 'features/users';

const Home = () => {
  const { data, error, isLoading, isFetching } = useGetUsersQuery();

  console.log({
    data,
    error,
    isLoading,
    isFetching,
  });

  if (isFetching) {
    return <span>Loading</span>;
  }

  const formatted = JSON.stringify(data, null, 2);

  return (
    <div>
      <h1>home</h1>
      <pre style={{ textAlign: 'left' }}>{formatted}</pre>
    </div>
  );
};

export default Home;
