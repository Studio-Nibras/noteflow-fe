import MaterialCard from "./MaterialCard";

const MaterialSelector = ({ materials, selectedMaterial, onSelect }) => {
  return (
    <div className="space-y-4">
      {materials.map((material) => (
        <MaterialCard
          key={material.id}
          material={material}
          selected={selectedMaterial?.id === material.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default MaterialSelector;
