interface IErrorProps {
  error: string;
}

export const Error = (props: IErrorProps) => {
  const { error } = props;
  return (
    <div>
      <h1>Error:</h1>
      <p>{error}</p>
      <img src="/error.svg" alt="Gremlin cutting cable between server and computer." />
    </div>
  );
};
