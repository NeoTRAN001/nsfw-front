"use client";

import { NextPage } from "next";
import { Button } from "@nextui-org/button";
import { Input, Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { DataResponse } from "./interface/data.interface";

const HomePage: NextPage = (props) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, _] = useState(10);
  const [data, setData] = useState([]);

  const handleSearch = (search: string, page: number, limit: number) => {
    getData(search, page, limit).then((data) => {
      setData(data);
    });
  };

  const handleInputChange = (event: any) => {
    setPage(1);
    setSearch(event.target.value);
  };

  useEffect(() => {
    handleSearch(search, page, limit);
  }, [search, page, limit]);

  return (
    <main className="w-[100vw] h-[100vh] bg-black p-14 overflow-y-scroll">
      <section className="w-full flex justify-between gap-3 pt-5">
        <Input
          type="text"
          label="Search"
          placeholder="Enter text"
          className="w-full"
          value={search}
          onChange={handleInputChange}
        />
      </section>
      <section className="flex justify-center w-full gap-3 mt-3">
        <Button
          color="primary"
          variant="shadow"
          className="h-11"
          onClick={() => setPage(page == 1 ? 1 : page - 1)}
        >
          {"<"}
        </Button>
        <Button
          color="primary"
          variant="shadow"
          className="h-11"
          onClick={() => setPage(page + 1)}
        >
          {">"}
        </Button>
      </section>
      <section className="grid grid-cols-4 gap-4 pt-5">
        {data.map((item: DataResponse) => (
          <Image
            key={item.id}
            isZoomed
            alt={item.id}
            className="object-cover"
            src={item.image_url}
          />
        ))}
      </section>
    </main>
  );
};

async function getData(search: string, page: number, limit: number) {
  const res = await fetch(
    `http://127.0.0.1:8000/data/get?search=${search}&page=${page}&limit=${limit}`
  );

  return res.json();
}

export default HomePage;
