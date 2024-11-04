const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="tw-relative tw-mb-6">
      <div className="tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pl-3 tw-pointer-events-none">
        <Icon className="tw-size-5 tw-text-white" />
      </div>
      <input
        {...props}
        className="tw-w-full tw-pl-10 tw-pr-3 tw-py-2 tw-bg-black tw-bg-opacity-5 tw-rounded-lg tw-border tw-border-gray-600 focus:tw-border-gray-200 focus:tw-ring-2 focus:tw-ring-gray-300 tw-text-white tw-placeholder-gray-400 tw-transition tw-duration-200"
      />
    </div>
  );
};
export default Input;
