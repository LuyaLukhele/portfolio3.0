import Me from "../assets/LuyandaShirtPP.avif"

const cards = [
  {
    title: "Back-End",
    description:
      "I build and maintain server-side applications and REST APIs using technologies such as Java and Spring Boot. My experience includes working with relational databases, designing API integrations, implementing business logic, troubleshooting issues, and developing reliable services that support real-world applications.",
    icon: (
      <svg
        className="h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
        />
      </svg>
    ),
  },
  {
    title: "Front-End",
    description:
      "I develop responsive web interfaces using JavaScript and React, with a focus on reusable components, API integration, usability, and maintainable code. I enjoy turning business requirements and designs into intuitive interfaces while ensuring applications remain reliable and easy to maintain.",
    icon: (
      <svg
        className="h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
        />
      </svg>
    ),
  },
  {
    title: "Engineering Approach",
    description:
      "I believe good software is more than code that works. I focus on writing maintainable code, understanding the problem before implementing a solution, and continuously improving the systems I work on. I'm comfortable learning unfamiliar technologies when a project requires them and enjoy solving problems collaboratively with other developers and stakeholders.",
    icon: (
      <svg
        className="h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
        />
      </svg>
    ),
    fullWidth: true,
  },
]

const About = ({ onNavigate }) => {
  return (
    <div className="py-10">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        <img
          src={Me}
          alt="Luyanda Lukhele"
          className="w-32 h-32 lg:w-56 lg:h-56 rounded-3xl object-cover shadow-e2 shrink-0"
        />
        <p className="font-display text-2xl lg:text-3xl font-semibold text-ink-900">
          I'm a Software Engineer who builds and maintains web applications
          across the{" "}
          <span className="text-orange-50 font-bold">front-end</span>,{" "}
          <span className="text-orange-50 font-bold">back-end</span>, APIs,
          and databases.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {cards.map(({ title, description, icon, fullWidth }) => (
          <div
            key={title}
            className={
              "bg-surface-container border border-outline rounded-[20px] shadow-e1 p-5" +
              (fullWidth ? " sm:col-span-2" : "")
            }
          >
            <div className="h-9 w-9 rounded-md flex items-center justify-center bg-navy-20">
              {icon}
            </div>
            <h3 className="mt-4 font-display font-semibold text-ink-900">
              {title}
            </h3>
            <p className="mt-2 text-ink-700 leading-relaxed">{description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[20px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-navy-20 py-6 px-6">
        <div>
          <h3 className="text-white font-display font-semibold text-lg">
            Open to new opportunities
          </h3>
          <p className="mt-1 text-white/70">
            If you're looking for a engineer with front-end and back-end
            experience, I'd love to hear from you.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate(4)}
          className="shrink-0 rounded-full px-5 py-2.5 text-white font-semibold self-start sm:self-auto bg-orange-50 hover:bg-orange-40 transition"
        >
          Get in touch
        </button>
      </div>
    </div>
  )
}
export default About
