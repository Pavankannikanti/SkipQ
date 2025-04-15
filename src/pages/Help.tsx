import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Headphones, MessageCircle, Search } from "lucide-react";

const faqs = [
  {
    question: "How does SkipQ work?",
    answer: "SkipQ connects people who don't want to wait in line with those willing to wait for them. You can request someone to wait in line for you at busy places, and only pay for the time they spend waiting."
  },
  {
    question: "How do I make a request?",
    answer: "Click on the 'New Request' button in the sidebar, select a location, specify the time and details, and submit your request. Our algorithm will match you with an available Q Agent."
  },
  {
    question: "How much does the service cost?",
    answer: "Pricing is based on the time a Q Agent spends in line for you. You can see the estimated cost before confirming your request."
  },
  {
    question: "Can I cancel my request?",
    answer: "Yes, you can cancel your request before a Q Agent accepts it without any charges. If a Q Agent has already accepted your request, cancellation fees may apply."
  },
  {
    question: "How do I become a Q Agent?",
    answer: "Click on 'Find Jobs' in the sidebar and follow the instructions to set up your profile. Once approved, you can start accepting waiting requests in your area."
  },
  {
    question: "Is my payment information secure?",
    answer: "Yes, we use industry-standard encryption and security measures to protect your payment information. We never store your full credit card details on our servers."
  }
];

const Help = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground">Find answers to common questions or contact our support team</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Find answers to the most common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative mb-4">
                  <Input placeholder="Search for answers..." className="pl-9" />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <p className="text-sm text-muted-foreground">Can't find what you're looking for? Contact our support team.</p>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card className="border-primary/10 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat with Support
                </CardTitle>
                <CardDescription>
                  Our support team is available 24/7 to assist you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  Get instant answers to your questions by chatting with our customer support team.
                </p>
                <Button className="w-full">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Start Chat
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-primary/10 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Headphones className="h-5 w-5" />
                  Call Support
                </CardTitle>
                <CardDescription>
                  Speak directly with our support agents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">
                  For urgent matters or complex issues, call our support line for immediate assistance.
                </p>
                <Button className="w-full" variant="outline">
                  <Headphones className="mr-2 h-4 w-4" />
                  Call Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
