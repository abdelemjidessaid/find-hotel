const Hero = () => {
  return (
    <div className="bg-teal-700 pb-12">
      <div className="container mx-auto flex flex-col gap-2">
        {/* hero title  */}
        <h1 className="text-xl text-white font-normal">Find your next stay</h1>
        {/* hero text  */}
        <p className="text-sm text-gray-100">
          Search low prices on hotels for your dream vacation...
        </p>
      </div>
    </div>
  );
};

export default Hero;
