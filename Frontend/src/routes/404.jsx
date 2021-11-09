import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main>
      <p>There's nothing here!</p>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </main>
  )
};
