import PackageItem from './packageitem';
import React from "react";

interface Package {
    name: string;
}

interface PackageListProps {
    packages: Package[];
}

const PackageList: React.FC<PackageListProps> = ({ packages }) => {
    return (
        <div>
            {packages.map((packageItem) => (
                <PackageItem packageItem={packageItem} />
            ))}
        </div>
    );
};

export default PackageList;
