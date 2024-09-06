import React from 'react';

import { Separator } from '@repo/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/tabs';

export default async function HomePage() {
  return (
    <div>
      <h4 className={'font-bold'}>Home Page</h4>
      <p className={'py-2 text-gray-600'}>
        Bellow you can see all the components used in our application
      </p>
      <Separator className={'mb-6 mt-4'} />
      <Tabs defaultValue={'inputs'}>
        <TabsList>
          <TabsTrigger value="inputs">Inputs</TabsTrigger>
          <TabsTrigger value="dropdowns">Dropdowns</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
        </TabsList>
        <TabsContent value="inputs">
          <div>
            TODO <b>@razvanbretoiu</b> add all the inputs
          </div>
        </TabsContent>

        <TabsContent value="dropdowns">
          <div>
            TODO <b>@razvanbretoiu</b> add all the dropdowns
          </div>
        </TabsContent>

        <TabsContent value="buttons">
          <div>TODO @razvanbretoiu add all the buttons</div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
