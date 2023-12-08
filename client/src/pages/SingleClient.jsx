import { useParams } from "react-router-dom";
import { LocationModal } from "../components/modals";

const SingleClient = () => {
  const { id } = useParams();

  return <div>SingleClient
    <LocationModal clientId={id} />
  </div>;
};
export default SingleClient;
