import { serve } from "bun";
import { BunFS } from "../src/lib/bunFs";

const fs = new BunFS();

// Create DB
// example a
// 

type User = {
  id: number;
  name: string;
  address: string;
  img: string;
  description: string;
};

const users: User[] = [
  {
    id: 1,
    name: "lucas",
    address: "Mexico",
    description: "student",
    img: "https://www.svgrepo.com/show/507440/user.svg",
  },
  {
    id: 2,
    name: "Marcos",
    address: "USA",
    description: "student",
    img: "https://www.svgrepo.com/show/507440/user.svg",
  },
  {
    id: 3,
    name: "luisa",
    address: "Francia",
    description: "student",
    img: "https://www.svgrepo.com/show/509279/user-female.svg",
  },
  {
    id: 4,
    name: "Ana",
    address: "Colombia",
    description: "student",
    img: "https://www.svgrepo.com/show/509279/user-female.svg",
  },
];

const createDb = async () => {
  const result = await fs.exists("./users.json");

  if (!result) {
    console.log(await fs.writeFile("./users.json", JSON.stringify(users)));
  }
};

await createDb();

//@ts-ignore
serve({
  development: true,

  async fetch(request: Request) {
    const { url, method } = request;
    const { pathname } = new URL(url);
    const filename = "./users.json";

    if (pathname === "/" && method === "GET") {
      return new Response("<h1>Hello world</h1>", {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Access-control-allow-origin": "*",
        },
      });
    }

    if (pathname === "/user" && method === "POST") {
      type Body = { id: number };

      try {
        const body: Body = await request.json();
        const { id } = body;

        if (!id) {
          return new Response(JSON.stringify({ message: "Bad request" }), {
            status: 400,
          });
        }
        const users = JSON.parse(await fs.openFile(filename));
        const newJson = users.filter((user: Body) => user.id == body.id);

        return new Response(JSON.stringify(newJson), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-control-allow-origin": "*",
          },
        });
      } catch (error) {
        return new Response(JSON.stringify({ message: "Bad request" }));
      }
    }

    if (pathname === "/updateduser" && method === "PUT") {
      type Body = {
        id: number;
        name: string;
        address: string;
        description: string;
        img: string;
      };
      const body: Body = await request.json();
      const { id, name, address, description, img } = body;

      if (!id || !name || !address || !description || !img) {
        return new Response(JSON.stringify({ message: "Bad request" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-control-allow-origin": "*",
          },
        });
      }

      const newJson = users.map((user: Body) => {
        if (body.id === user.id) {
          return body;
        }
        return user;
      });
      await fs.writeFile(filename, JSON.stringify(newJson));

      return new Response(JSON.stringify(newJson), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-control-allow-origin": "*",
        },
      });
    }

    if (pathname === "/users" && method === "GET") {
      const users = JSON.parse(await fs.openFile(filename));
      return new Response(JSON.stringify(users), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    if (pathname === "/createuser" && method === "POST") {
      const users = JSON.parse(await fs.openFile(filename));
      type Body = {
        name: string;
        address: string;
        description: string;
        img: string;
      };

      const body: Body = await request.json();

      const { name, address, description, img } = body;

      if (!name || !address || !description || !img) {
        return new Response(JSON.stringify({ message: "Bad request" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-control-allow-origin": "*",
          },
        });
      }

      const id: number = users.length + 1;
      const newUser: Body = {
        //@ts-ignore
        id: id,
        name: body.name,
        address: body.address,
        description: body.description,
        img: body.img,
      };
      const newJson = users.concat(newUser);
      await fs.writeFile(filename, JSON.stringify(newJson));

      return new Response(JSON.stringify(newJson), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-control-allow-origin": "*",
        },
      });
    }

    if (pathname === "/deleteuser" && method === "DELETE") {
      type Body = { id: number };
      const body: Body = await request.json();
      const { id } = body;

      if (!id) {
        return new Response(JSON.stringify({ message: "Bad request" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-control-allow-origin": "*",
          },
        });
      }

      const newJson = users.filter((user: Body) => user.id !== body.id);
      await fs.writeFile(filename, JSON.stringify(newJson));
      return new Response(JSON.stringify(newJson), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-control-allow-origin": "*",
        },
      });
    }
  },

  port: 4000,
});

console.log("Sever on port 4000");
