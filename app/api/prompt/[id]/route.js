import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const { id } = await params;

    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch the prompt", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    const { id } = await params;
    const { prompt, tag } = await req.json();

    await connectToDB();

    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to edit the prompt", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    const { id } = await params;

    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    await Prompt.findByIdAndDelete(id);

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to delete the prompt", { status: 500 });
  }
};
