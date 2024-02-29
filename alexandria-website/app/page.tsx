import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/app/header";
import SearchBar from "@/app/search";
import PackageList from "@/app/packagelist";

interface Package {
  name: string;
}

export default function Home() {

  const packages: Package[] = [
    {name: 'How to tie your shoes'},
    {name: 'Is this a rectangle? The answer will surprise you!'},
    {name: 'The secret to a happy life'},
    {name: 'A funny joke '}
  ]

  return (
    <div>
      <Header />
      <SearchBar />
      <PackageList packages={packages} />
    </div>
  );
}
