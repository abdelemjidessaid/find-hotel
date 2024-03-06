const Footer = () => {
  return (
    <div className="bg-teal-700 py-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* footer logo  */}
        <span className="text-xl text-white font-bold tracking-tight">
          Find Hotels
        </span>
        {/* footer links  */}
        <span className="text-white text-sm underline-offset-8 font-semibold tracking-tight flex gap-4">
          <p className="cursor-pointer hover:underline transition-all ease-in-out duration-200">
            Privacy Policy
          </p>
          <p className="cursor-pointer hover:underline transition-all ease-in-out duration-200">
            Terms of Service
          </p>
        </span>
      </div>
    </div>
  );
};

export default Footer;
