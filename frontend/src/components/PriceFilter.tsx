type Props = {
  selectedPrice?: number;
  onChange: (value?: number) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      {/* Price Filter Title */}
      <h4 className="text-sm font-semibold mb-2">Max Price</h4>
      {/* Select of Price Filter */}
      <select
        value={selectedPrice}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
        className="text-sm bg-transparent p-2 border rounded-md w-full"
      >
        {/* Max Price Options */}
        <option value="">Select Max Price</option>
        {[10, 50, 100, 200, 300, 500].map((price) => (
          <option value={price}>{price}</option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
