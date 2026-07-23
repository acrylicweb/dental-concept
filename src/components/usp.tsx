import { uspdata } from "../data/uspdata";

const UniqueSP = () => {
  return (
    <div className="usp-container">
      {uspdata.map((usp) => (
        <article className="usp-item">
          <img src={usp.graphic} alt={usp.alt} className="usp-image" />
          <h3>{usp.name}</h3>
          <p>{usp.description}</p>
        </article>
      ))}
    </div>
  );
};

export default UniqueSP;
