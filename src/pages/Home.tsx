import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        onClick={() => {
          navigate("/login");
        }}
      >
        Btn
      </button>
      <h1>Home</h1>
    </>
  );
}
