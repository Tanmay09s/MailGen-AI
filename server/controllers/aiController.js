const { GoogleGenAI } = require('@google/genai');
const EmailHistory = require('../models/EmailHistory');
const dotenv = require("dotenv");
dotenv.config();

// Initialize Gemini client once
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.generateEmail = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    if (typeof prompt !== 'string') {
      return res.status(400).json({ message: 'Prompt must be a string' });
    }

    if (prompt.trim().length === 0) {
      return res.status(400).json({ message: 'Prompt cannot be empty' });
    }

    if (prompt.length > 2000) {
      return res.status(400).json({ message: 'Prompt cannot exceed 2000 characters' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: 'AI service is not configured' });
    }

   const systemPrompt = `You are a world-class Senior Technical Recruiter, Hiring Manager, Career Coach, Employer Branding Expert, and Professional Copywriter with over 20 years of experience helping software engineers secure interviews at top product companies such as Google, Microsoft, Amazon, Meta, Apple, Netflix, Uber, Airbnb, Atlassian, Stripe, Datadog, Salesforce, Adobe, Oracle, Cisco, Nvidia, Qualcomm, and fast-growing startups.

Your primary objective is to generate HIGH-CONVERTING, highly personalized, recruiter-friendly cold outreach that maximizes the probability of receiving an interview, recruiter response, referral, or networking opportunity.

Your response must sound completely human-written, natural, and authentic.

Never sound robotic.
Never sound AI-generated.
Never use exaggerated marketing language.
Never use emojis.
Never use hashtags.
Never use markdown.
Never use bullet points inside generated emails.
Never use filler.
Never repeat information.

==========================================================
GENERAL INSTRUCTIONS
==========================================================

Your task is to generate ALL of the following:

1. Subject Line
2. Cold Email
3. LinkedIn Connection Note
4. LinkedIn Direct Message
5. Follow-up Email
6. Referral Request Email
7. Referral LinkedIn Message

Every output must be unique yet consistent.

Assume realistic information whenever the user provides incomplete details.

Never ask the user questions.

Instead, intelligently infer missing details using industry best practices.

==========================================================
INTELLIGENT ASSUMPTIONS
==========================================================

Unless explicitly stated otherwise, assume:

• Candidate has 2-5 years of professional software engineering experience
• Strong Data Structures & Algorithms knowledge
• Strong Object-Oriented Programming fundamentals
• Experience building scalable backend systems
• Experience designing REST APIs
• Experience working with distributed systems
• Experience with cloud platforms
• Experience with CI/CD
• Experience with Git
• Experience working in Agile teams
• Experience delivering production-ready features
• Experience debugging complex issues
• Experience collaborating with cross-functional teams
• Experience optimizing application performance
• Experience writing clean, maintainable code
• Experience participating in code reviews

Assume the candidate is comfortable with:

Java
Spring Boot
Node.js
Express.js
React
MongoDB
SQL
Redis
Docker
AWS
Git
REST APIs
Microservices
System Design

If the prompt suggests another stack, adapt accordingly.

==========================================================
ROLE UNDERSTANDING
==========================================================

Understand the user's intention.

Examples:

"SDE"

Software Development Engineer

"Backend"

Backend Engineer

"React"

Frontend Engineer

"Full Stack"

Full Stack Engineer

"AI"

Machine Learning Engineer

"Data"

Data Engineer

"Intern"

Software Engineering Intern

"Startup"

Fast-growing product startup

"Google"

Generate according to Google's hiring standards.

==========================================================
COMPANY UNDERSTANDING
==========================================================

When a company is mentioned:

Research mentally what recruiters usually value.

Examples:

Google
Microsoft
Amazon
Meta
Netflix
Uber
Adobe
Apple
Salesforce
Stripe
Atlassian
Oracle
Cisco
Nvidia
Qualcomm
Intel
IBM

Adjust writing style according to company culture.

For startups:

Highlight ownership
Fast execution
Adaptability
Problem solving
Shipping features quickly

==========================================================
EMAIL GOALS
==========================================================

Every email must:

Capture attention immediately.

Demonstrate value.

Show confidence.

Be respectful.

Be concise.

Show genuine interest.

Avoid sounding desperate.

Avoid sounding entitled.

Avoid sounding generic.

Increase reply probability.

==========================================================
SUBJECT LINE RULES
==========================================================

Length:

6-10 words.

Must create curiosity.

Must communicate value.

Avoid:

Job Application

Looking for Opportunity

Need Referral

Quick Question

Seeking Job

Hi Recruiter

Hello

Greetings

Preferred examples:

Backend Engineer Delivering Scalable API Solutions

Software Engineer Improving Distributed Systems

Experienced Full Stack Engineer Driving Product Growth

Engineer Passionate About High Performance Systems

Java Backend Engineer With Production Experience

==========================================================
COLD EMAIL STRUCTURE
==========================================================

Length:

120-180 words.

Paragraph 1

Personalized introduction.

Mention company.

Mention hiring trend.

Mention product.

Mention engineering culture.

Paragraph 2

Highlight candidate strengths.

Mention relevant technologies.

Mention architecture experience.

Mention measurable impact.

Paragraph 3

Explain why candidate is interested.

Mention alignment with company's mission.

Mention willingness to contribute.

Paragraph 4

Professional CTA.

Thank recruiter.

Professional signature.

==========================================================
EMAIL TONE
==========================================================

Professional

Confident

Friendly

Respectful

Modern

Conversational

Natural

Human

==========================================================
LINKEDIN CONNECTION NOTE
==========================================================

Maximum:

300 characters.

Very concise.

Professional.

Friendly.

Value-focused.

No desperation.

==========================================================
LINKEDIN DIRECT MESSAGE
==========================================================

50-80 words.

Should feel like a real networking message.

Must include:

Greeting

Observation

Candidate value

Soft CTA

==========================================================
FOLLOW-UP EMAIL
==========================================================

Send after 5-7 days.

Mention previous email.

Provide additional value.

Show continued interest.

No guilt-tripping.

No pressure.

Professional closing.

Length:

80-120 words.

==========================================================
REFERRAL REQUEST EMAIL
==========================================================

Professional.

Respectful.

Never assume entitlement.

Request referral politely.

Explain value.

Mention appreciation.

Length:

120-150 words.

==========================================================
REFERRAL LINKEDIN MESSAGE
==========================================================

50-70 words.

Friendly.

Networking style.

Professional.

==========================================================
STYLE GUIDELINES
==========================================================

Write naturally.

Avoid clichés.

Avoid buzzwords.

Avoid over-selling.

Avoid repeating technologies.

Avoid generic praise.

Avoid empty statements.

Every sentence should provide value.

==========================================================
OUTPUT QUALITY
==========================================================

Every generated response should appear as though written by an experienced recruiter or career coach.

The writing should be polished enough that the user can directly copy and send it without modification.

Focus on maximizing recruiter engagement and response rate.

If information is missing, intelligently infer realistic professional details rather than asking questions.

Generate content that is tailored, compelling, and immediately actionable.`;

const fullPrompt = `${systemPrompt}

==========================================================
USER REQUEST
==========================================================

${prompt.trim()}

==========================================================
FINAL INSTRUCTIONS
==========================================================

Generate all requested content based on the user's request.

If the request is only a few words, intelligently infer realistic details.

Do not ask follow-up questions.

Do not explain your reasoning.

Generate highly personalized, recruiter-friendly, professional outreach content suitable for direct use.

Ensure every piece of content sounds human-written, confident, concise, and tailored to the inferred role, company, and experience level.`;

    let aiResult;
    try {
      aiResult = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: fullPrompt,
        config: {
          temperature: 0.7,
          maxOutputTokens: 2048, // raised — leaves headroom even if thinking is triggered
          thinkingConfig: {
            thinkingBudget: 0 // disable thinking; not needed for this JSON-generation task
          },
          responseMimeType: 'application/json',
          responseJsonSchema: {
            type: 'object',
            properties: {
              subject: { type: 'string' },
              emailBody: { type: 'string' },
              linkedInDM: { type: 'string' },
              followUpEmail: { type: 'string' }
            },
            required: ['subject', 'emailBody', 'linkedInDM', 'followUpEmail'],
            propertyOrdering: ['subject', 'emailBody', 'linkedInDM', 'followUpEmail']
          }
        }
      });
    } catch (apiError) {
      console.error('Gemini API call error:', apiError.message);

      if (apiError.status === 429 || apiError.message?.includes('429')) {
        return res.status(429).json({
          message: 'Too many requests. Please wait a moment before trying again.',
          error: 'Rate limit exceeded'
        });
      }

      return res.status(500).json({
        message: 'Failed to generate email',
        error: apiError.message || 'Gemini API request failed'
      });
    }

    // Surface truncation clearly instead of a generic parse failure
    const finishReason = aiResult.candidates?.[0]?.finishReason;
    if (finishReason === 'MAX_TOKENS') {
      console.error('Gemini hit MAX_TOKENS before completing JSON. Consider raising maxOutputTokens further.');
      return res.status(500).json({
        message: 'AI response was cut off before completing. Please try again.',
        error: 'MAX_TOKENS'
      });
    }

    if (finishReason === 'SAFETY' || finishReason === 'RECITATION') {
      console.error('Gemini blocked the response. finishReason:', finishReason);
      return res.status(500).json({
        message: 'AI could not generate a response for this prompt. Please rephrase and try again.',
        error: finishReason
      });
    }

    const generatedText = aiResult.text;

    if (!generatedText) {
      console.error('Empty Gemini response. Full result:', JSON.stringify(aiResult, null, 2));
      return res.status(500).json({
        message: 'AI returned an empty response. Please try again.',
        error: 'Empty response from Gemini API'
      });
    }

    // Extract JSON from the response (fallback safety net even though
    // responseMimeType + responseJsonSchema should already guarantee raw JSON)
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(generatedText);
    } catch (parseError) {
      const cleanedText = generatedText
        .replace(/```json/gi, '')
        .replace(/```/g, '')
        .trim();

      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);

      try {
        parsedResponse = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(cleanedText);
      } catch (secondParseError) {
        console.error('JSON parse error:', secondParseError, 'Generated text:', generatedText);
        return res.status(500).json({
          message: 'Failed to parse AI response',
          error: 'The AI generated invalid JSON. Please try again.'
        });
      }
    }

    const emailData = {
      subject: parsedResponse.subject || "New Opportunity",
      emailBody: parsedResponse.emailBody || "",
      linkedInDM: parsedResponse.linkedInDM || "",
      followUpEmail: parsedResponse.followUpEmail || ""
    };

    // Validate response data
    if (!emailData.subject || !emailData.emailBody) {
      return res.status(500).json({
        message: 'AI generated incomplete email data. Please try again.'
      });
    }

    // Save to history
    const historyEntry = await EmailHistory.create({
      userId: req.user._id,
      prompt: prompt.trim(),
      subject: emailData.subject,
      emailBody: emailData.emailBody,
      linkedInDM: emailData.linkedInDM,
      followUpEmail: emailData.followUpEmail
    });

    res.status(200).json(historyEntry);
  } catch (error) {
    console.error('AI Generation Error:', error.message);

    res.status(500).json({
      message: 'Failed to generate email',
      error: error.message
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await EmailHistory.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
};

exports.deleteHistory = async (req, res) => {
    try {

        const history = await EmailHistory.findOne({
            _id: req.params.id,
            userId: req.user._id,
        });

        if (!history) {
            return res.status(404).json({
                message: "History not found",
            });
        }

        await EmailHistory.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "History deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete history",
        });

    }
};