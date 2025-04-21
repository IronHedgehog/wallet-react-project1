const fetchExchangeRate = async () => {
  const response = await fetch(
    "https://wallet-react-project-back.onrender.com/api/currency"
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return response.json();
};

export default fetchExchangeRate;
