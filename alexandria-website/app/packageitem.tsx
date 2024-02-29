import React from "react";

interface PackageItemProps {
    packageItem: {
        name: string;
    };
}

const PackageItem: React.FC<PackageItemProps> = ({ packageItem }) => {
    return (
        <div className="package">
            <h2>{packageItem.name}</h2>
            <p>Temporary package description</p>
        </div>
    );
}

export default PackageItem;