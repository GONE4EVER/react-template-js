import { useGetUsersQuery } from 'features/users';

const Home = () => {
  const { data, isFetching, isLoading } = useGetUsersQuery();

  if (isLoading) {
    return <span>Loading data</span>;
  }

  const formatted = JSON.stringify(data, null, 2);

  return (
    <div>
      <h1>home</h1>
      {isFetching && <span>Refetching</span>}
      <pre style={{ textAlign: 'left' }}>{formatted}</pre>
    </div>
  );
};

export default Home;
