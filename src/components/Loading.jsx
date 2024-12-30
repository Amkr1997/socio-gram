import { Link } from "react-router-dom";

const Loading = () => {
  return (
    <>
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-6"></span>
          <span className="placeholder col-8"></span>
        </p>
        <Link
          className="btn btn-primary disabled placeholder col-6"
          aria-disabled="true"
        ></Link>
      </div>
    </>
  );
};

export default Loading;
