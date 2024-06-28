import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const newProductData = await collection.find().limit(10).toArray();
    return res.json({ data: newProductData });
  } catch (error) {
    console.error(error);
    return res.json({ message: `${error}` });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.id);
    const productById = await collection.findOne({ _id: productId });
    return res.json({ data: productById });
  } catch (error) {
    console.error(error);
    return res.json({ message: `${error}` });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productData = { ...req.body, created_at: new Date() };
    const newProductData = await collection.insertOne(productData);
    return res.json({
      message: `Product ${newProductData.insertedId} has been created successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.json({ message: `${error}` });
  }
});

productRouter.put("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.id);
    const productData = { ...req.body, updated_at: new Date() };
    await collection.updateOne({ _id: productId }, { $set: { productData } });
    return res.json({
      message: `Product ${productId} has been updated successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.json({ message: `${error}` });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const productId = new ObjectId(req.params.id);
    await collection.deleteOne({ _id: productId });
    return res.json({
      message: `Product record ${productId} has been deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    return res.json({ message: `${error}` });
  }
});

export default productRouter;
