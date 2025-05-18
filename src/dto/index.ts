import { iotSchema,iotListSchema,createIotSchema,updateIotSchema,deleteIotSchema } from "./device.dto";
import {peekySettingsSchema} from "./peeky.dto";
import { hearySettingsSchema } from "./heary.dto";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { emptyBodySchema } from "./basics.dto";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

const openApiRegistry = new OpenAPIRegistry();

openApiRegistry.register("device", iotSchema);
openApiRegistry.register("deviceList", iotListSchema);
openApiRegistry.register("CreateDevice", createIotSchema);
openApiRegistry.register("UpdateDevice", updateIotSchema);
openApiRegistry.register("DeleteDevice", deleteIotSchema);

openApiRegistry.register("HearySettings", hearySettingsSchema);
openApiRegistry.register("PeekySettings", peekySettingsSchema);

export { openApiRegistry };
export { emptyBodySchema };

export {
  iotSchema,
  iotListSchema,
  createIotSchema,
  updateIotSchema,
  deleteIotSchema,
  hearySettingsSchema,
  peekySettingsSchema,
};


