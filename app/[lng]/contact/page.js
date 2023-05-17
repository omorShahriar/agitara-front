import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  return (
    <div className="max-w-[800px] mx-auto my-8 ">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center">
        Contact Us
      </h2>
      <Tabs
        defaultValue="company"
        className="max-w-[400px] py-6 flex flex-col items-center mx-auto "
      >
        <TabsList className="max-w-fit">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="ticket-support">Ticket Support</TabsTrigger>
        </TabsList>
        <TabsContent value="company">
          <div className="space-y-2 md:text-xl my-4">
            <p>AGITARA GmbH</p>
            <p>Daimler Str. 11</p>
            <p>41564 Kaarst Germany</p>
            <a
              className="mt-2 block hover:text-emerald-500 transition-colors duration-300"
              href="tel:+49(0)21317085172"
            >
              +49(0)21317085172
            </a>
          </div>
        </TabsContent>
        <TabsContent value="ticket-support">ticket support info</TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
