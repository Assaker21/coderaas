function Project({ pro, index }) {
  return (
    <div className="card" key={"Project " + index}>
      <img src={pro.img} alt="" />
      <div className="info">
        <div className="position-title">{pro.title}</div>
        <span className="desc">{pro.desc}</span>

        <div className="technologies">
          {pro.tags.map((tag, tag_index) => {
            return (
              <div
                className="tech"
                key={"Project " + index + " - tag: " + tag_index}
              >
                {tag}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Project;
