"use client";

import { FormEvent, JSX, SVGProps, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChatSession } from "@/utils/aiModal";

interface FormData {
  name: string;
  jobTitle: string;
  jobDesc: string;
  company: string;
  skills: string;
  experience: string;
  coverLetter: JSON | any;
  // coverLetter: string | any;
}

export default function Component() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    jobTitle: "",
    jobDesc: "",
    company: "",
    skills: "",
    experience: "",
    coverLetter: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [iscopied, setIscopied] = useState(false);
  const handleInputChange = (e: FormEvent<HTMLFormElement> | any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { name, jobTitle, company, skills, experience, jobDesc } = formData;

      const inputPrompt = `Write A well-structured compelling cover letter that effectively conveys qualifications and enthusiasm for the position. using the ${jobTitle} position and ${jobDesc} at ${company}, name of applicant ${name}, ${skills}, and ${experience}. it should be without the address and start with dear hiring manager`;
      const result = await ChatSession.sendMessage(inputPrompt);
      
      console.log(result.response.text());

      const data = result.response.text();
      setFormData({ ...formData, coverLetter: data });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error generating cover letter:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(formData.coverLetter);
    setIscopied(true);
    toast.success("Cover letter copied to clipboard!");
  };

  return (
    <div className="flex flex-col absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <header className="border-b border-neutral-200 bg-gray-100 text-neutral-900 py-4 px-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-lg font-bold">
              Cover Letter Generator
            </a>
          </div>
        </nav>
      </header>

      <div className="flex flex-col items-center justify-center flex-1 bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Cover Letter Generator
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-neutral-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label
                htmlFor="jobTitle"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Job Title
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-neutral-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label
                htmlFor="jobDesc"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Job Description
              </label>

              <textarea
                id="jobDesc"
                name="jobDesc"
                value={formData.jobDesc}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-neutral-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                rows={3}
                required
              />
            </div>

            <div>
              <label
                htmlFor="company"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-neutral-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                required
              />
            </div>

            <div>
              <label
                htmlFor="skills"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Skills
              </label>
              <textarea
                id="skills"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-neutral-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                rows={3}
                required
              />
            </div>

            <div>
              <label
                htmlFor="experience"
                className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
              >
                Experience
              </label>
              <textarea
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:border-neutral-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                rows={3}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-neutral-900 rounded-md hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Cover Letter"}
            </button>
          </form>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dialog-content">
          <DialogHeader>
            <DialogTitle>Your Cover Letter</DialogTitle>
            <DialogDescription>
              Here is your personalized cover letter. You can copy it to your
              clipboard.
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-lg dark:prose-invert dialog-body">
            <p>{formData.coverLetter}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCopyToClipboard}>
              <CopyIcon className="h-5 w-5 mr-2" />
              {iscopied ? "Copied" : "Copy to Clipboard"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CopyIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
