import styles from "./School.module.scss";

function School() {
  return (
    <div className={styles.school}>
      <a
        href="https://rs.school/"
        className={styles.logo}
      >
        <img
          src="rs_school_js.svg"
          alt="RSS"
        />
      </a>
      <p className={styles.description}>
        RS School is free-of-charge and community-based education program conducted by The Rolling Scopes developer
        community since 2013. Everyone can study at RS School, regardless of age, professional employment, or place of
        residence. The mentors and trainers of our school are front-end and javascript developers from different
        companies and countries.
      </p>
    </div>
  );
}

export default School;
