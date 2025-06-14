import Button from "../ui/Button";

const ReadyCTA = () => {
  return (
    <div className='flex justify-center items-center flex-col gap-6 p-8 mt-10'>
      <div>
        <span className='text-xl font-semibold'>
          Ready to own a home that grows in value?
        </span>
      </div>
      <div>
        <p className='text-center text-gray-600 leading-7'>
          Experience the beauty, location, and value of our properties
          firsthand. <br /> Let’s help you take the first step toward
          owning or investing in your dream property.
        </p>
      </div>
      <div>
        <Button className={'py-4'} title={"Secure Your Spot"} />
      </div>
    </div>
  );
};
export default ReadyCTA;
