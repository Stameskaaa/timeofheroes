import './loader.css';

export const CubeLoader = ({ className }: { className?: string }) => {
  return (
    <div className={`relative h-4 w-4 flex items-center justify-center ${className}`}>
      <div className="cube-loader absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          id="sq1"
          className="square bg-gray-300 w-[10px] h-[10px] absolute -top-5 -left-5"></div>
        <div id="sq2" className="square bg-gray-300 w-[10px] h-[10px] absolute -top-5 left-0"></div>
        <div id="sq3" className="square bg-gray-300 w-[10px] h-[10px] absolute -top-5 left-5"></div>
        <div id="sq4" className="square bg-gray-300 w-[10px] h-[10px] absolute top-0 -left-5"></div>
        <div id="sq5" className="square bg-gray-300 w-[10px] h-[10px] absolute top-0 left-0"></div>
        <div id="sq6" className="square bg-gray-300 w-[10px] h-[10px] absolute top-0 left-5"></div>
        <div id="sq7" className="square bg-gray-300 w-[10px] h-[10px] absolute top-5 -left-5"></div>
        <div id="sq8" className="square bg-gray-300 w-[10px] h-[10px] absolute top-5 left-0"></div>
        <div id="sq9" className="square bg-gray-300 w-[10px] h-[10px] absolute top-5 left-5"></div>
      </div>
    </div>
  );
};
