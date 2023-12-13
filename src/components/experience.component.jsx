function Experience({ exp, index }) {
  return (
    <div className="card" key={"Experience " + index}>
      <div className="dates">{exp.date}</div>
      <div className="info">
        <div className="position-title">{exp.title}</div>
        <span className="desc">{exp.desc}</span>

        <div className="technologies">
          {exp.tags.map((tag, tag_index) => {
            return (
              <div
                className="tech"
                key={"Experience " + index + " - tag: " + tag_index}
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

export default Experience;
