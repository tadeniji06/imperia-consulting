import { hero4 } from "../../assets";

const Projects = () => {
  return (
    <div>
      <div className='flex justify-center mb-4'>
        <span className='text-2xl font-bold text-center'>
          Our Projects
        </span>
      </div>{" "}
      <img
        src={hero4}
        alt='Projects'
        className='w-full h-96 object-cover'
      />
    </div>
  );
};
export default Projects;
