"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardHeader, CardBody } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const allLeaders = [
  {
    name: "Geoffery Kangwana",
    slug: "geoffery-kangwana",
    role: "Chairman - Board Of Directors",
    category: "Board of Directors",
    bio: "Mr. Geoffrey Kangwana serves as the Chairman of the Board of Directors, bringing a wealth of actuarial expertise to the role. With a distinguished background that includes being a Fellow of the Institute and Faculty of Actuaries in the UK, Geoffrey holds both bachelor's and master's degrees in Actuarial Science. Geoffrey is an insurance expert, having held significant positions such as Head of Actuarial at Jubilee Health Insurance Kenya and Senior Consultant at Deloitte UK. Geoffrey’s combination of academic achievements and practical experience positions him well to contribute to Birdview’s strategic initiatives and ongoing success in the insurance sector.",
    image: "/assets/managementPhotos/Geoffrey-Kangwana.png",
    cta: {
      title: "Championing Actuarial Excellence",
      text: "Geoffrey’s actuarial expertise and strategic insight continue to shape Birdview’s long-term stability and growth.",
      button: "Explore Geoffrey’s Strategic Vision",
      link: "/insights/geoffrey-kangwana",
    },
  },
  {
    name: "Richard Muiru",
    slug: "richard-muiru",
    role: "Director",
    category: "Board of Directors",
    bio: "Mr. Richard Muiru serves as a Director at Birdview. Richard joined Birdview out of his strong passion to support Kenyans in the diaspora, driven by a commitment to providing accessible and reliable insurance solutions. His entrepreneurial journey and extensive experience in both Kenyan and UK markets position him as a vital asset to the company. With over three decades of experience in various industries, Richard's business acumen and leadership skills are well-recognize in Kenya and UK. He is the driving force behind several thriving enterprises. Richard's diverse educational background equips him with a unique blend of skills and knowledge. He holds a Bachelors Degree in Leadership and Management from Phoenix University USA, a Diploma in Air Traffic and Control Services from Kenya Airforce and Aviation School, a Diploma in Social Services from the UK, enhancing his understanding of community needs and social support mechanisms. Richard also possesses a Certificate of Proficiency (COP) in Insurance, further broadening his expertise in risk management and financial services.",
    image: "/assets/managementPhotos/Richard-Muiru.png",
    cta: {
      title: "Empowering Diaspora Connections",
      text: "Richard’s global experience bridges communities, creating insurance solutions that uplift Kenyans at home and abroad.",
      button: "Read Richard’s Impact Story",
      link: "/insights/richard-muiru",
    },
  },
  {
    name: "James Kimani",
    slug: "james-kimani",
    role: "Director & Chief Executive Officer",
    category: "Board of Directors",
    bio: "James Kimani assumes the role of Director and Chief Executive Officer at Birdview, bringing with him extensive experience and expertise in the insurance sectorr. With a degree in Mathematics, an MBA in Strategic Management from the University of Nairobi, and accreditation as an Associate of the Insurance Institute of London, James boasts a strong educational foundation. His 25-year tenure in insurance, particularly his two-decade journey at Britam, showcases his remarkable ascent from a management trainee to a senior manager in Microinsurance. James has held diverse managerial positions, including Business Development Manager, Research and Innovation Manager, and Underwriting Manager, demonstrating his versatility and leadership acumen. His strategic vision and wealth of industry knowledge position him well to lead Birdview towards continued success and growth in the insurance market.",
    image: "/assets/managementPhotos/James-Kimani.png",
    cta: {
      title: "Driving Strategic Growth",
      text: "James’s leadership fuses innovation, experience, and strategic foresight to propel Birdview toward market excellence.",
      button: "Discover James’s Leadership Approach",
      link: "/insights/james-kimani",
    },
  },
  {
    name: "Obed Menjeri",
    slug: "obed-menjeri",
    role: "Director",
    category: "Board of Directors",
    bio: "Mr. Obed Menjeri serves as a Director and Head of Business Development, bringing over a decade of experience in fostering strategic partnerships, expanding market presence, and driving sustainable growth. With a background spanning esteemed organizations such as the Insurance Regulatory Authority, Kenya Commercial Bank, and ICEA Lion, he has demonstrated prowess in revenue generation, product launches, and collaborative ventures. Holding a Masters Degree in Actuarial Science and various certifications, Obed is committed to continuous learning and innovation. In his new role, he will spearhead growth initiatives, forge strategic alliances, and drive expansion efforts, positioning Birdview Microinsurance for success in realizing its vision and maximizing value for stakeholders.",
    image: "/assets/managementPhotos/Obed-Menjeri.png",
    cta: {
      title: "Building Strategic Partnerships",
      text: "Obed’s business development acumen fuels Birdview’s expansion and strengthens alliances across key markets.",
      button: "Explore Obed’s Growth Initiatives",
      link: "/insights/obed-menjeri-business",
    },
  },
  {
    name: "James Nyakundi",
    slug: "james-nyakundi",
    role: "Director",
    category: "Board of Directors",
    bio: "Mr. James Nyakundi is a Director at Birdview .He is a dynamic professional with a diverse educational background, holding a degree in Economics, a Masters in Research and Public Policy, a Higher Diploma in Human Resources, and being a Certified Public Accountant (CPA) finalist. With over 8 years of experience in project management and human resource transformation.James has demonstrated his expertise in driving organizational success. Previously, he held pivotal roles at PwC as an Associate Manager and at AH Consulting as the Chief Consulting Officer for East Africa. James brings a wealth of knowledge and leadership to his new position at Birdview, where he is poised to contribute significantly to the company’s strategic initiatives and continued growth.",
    image: "/assets/managementPhotos/James-Nyakundi.png",
    cta: {
      title: "Championing Organizational Transformation",
      text: "James’s leadership in policy, human capital, and governance empowers Birdview’s sustainable organizational evolution.",
      button: "Learn About James’s Transformative Approach",
      link: "/insights/james-nyakundi",
    },
  },
  {
    name: "Rodgers Moindi",
    slug: "rodgers-moindi",
    role: "Chief Executive Officer",
    category: "Executive Leadership",
    bio: "Rodgers Ongosi Moindi is a seasoned Finance and Accounting professional with over 15 years of progressive experience in the insurance and financial services sector. He possesses deep expertise in financial planning and analysis, strategic budgeting, credit management, regulatory compliance, and corporate reporting. Before his appointment as Chief Executive Officer of Birdview Microinsurance Ltd, Rodgers held senior leadership positions at leading insurers, including Sanlam General Insurance Ltd and Jubilee Health Insurance Ltd. In these roles, he successfully steered financial operations, strengthened internal controls, enhanced compliance frameworks, and provided strategic guidance on key initiatives that improved financial performance and corporate governance.Throughout his career, Rodgers has played a pivotal role in implementing IFRS 17 standards, developing and executing credit control policies, leading system migrations, and overseeing complex business restructuring projects. His leadership is marked by integrity, strategic foresight, and a commitment to financial excellence.Rodgers holds a Bachelor’s degree in Business Management (Finance and Banking) from Moi University and is a Certified Public Accountant (CPA Finalist) and a Certified Credit Professional (Finalist). He is also a member of the Institute of Certified Public Accountants of Kenya (ICPAK). ",
    image: "/assets/managementPhotos/Rodgers-Moindi.png",
    cta: {
      title: "Leading with Purpose and Innovation",
      text: "Rodgers inspires growth through trust-driven leadership and a commitment to community empowerment.",
      button: "Read Rodgers’s CEO Message",
      link: "/insights/rodgers-moindi",
    },
  },
  {
    name: "Mary Mundia",
    slug: "mary-mundia",
    role: "Finance Manager",
    category: "Executive Leadership",
    bio: "Mary Mundia is the Finance Manager at Birdview, where she leads the company’s financial operations and ensures its financial health. She holds a bachelor’s degree in finance and business management, in addition to being a Certified Public Accountant (CPAK). With over 15 years of experience in financial management and accounting, Mary brings a wealth of expertise to her role. Prior to joining Birdview, she served as the Head of Finance for the General Insurance Business at a leading insurance firm. In this role, she developed deep expertise in financial operations, budgeting, forecasting, and financial reporting. Her strong analytical skills and strategic approach play a crucial role in driving effective financial decision-making at Birdview.",
    image: "/assets/managementPhotos/Mary-Mundia.png",
    cta: {
      title: "Stewarding Financial Excellence",
      text: "Mary’s financial leadership ensures sustainable growth, transparency, and sound fiscal management at Birdview.",
      button: "Explore Mary’s Financial Insights",
      link: "/insights/mary-mundia",
    },
  },
  {
    name: "Obed Menjeri",
    slug: "obed-menjeri",
    role: "Business Development Manager",
    category: "Executive Leadership",
    bio: "Mr. Obed Menjeri serves as a Director and Head of Business Development, bringing over a decade of experience in fostering strategic partnerships, expanding market presence, and driving sustainable growth. With a background spanning esteemed organizations such as the Insurance Regulatory Authority, Kenya Commercial Bank, and ICEA Lion, he has demonstrated prowess in revenue generation, product launches, and collaborative ventures. Holding a Masters Degree in Actuarial Science and various certifications, Obed is committed to continuous learning and innovation. In his new role, he will spearhead growth initiatives, forge strategic alliances, and drive expansion efforts, positioning Birdview Microinsurance for success in realizing its vision and maximizing value for stakeholders.",
    image: "/assets/managementPhotos/Obed-Menjeri.png",
    cta: {
      title: "Driving Business Expansion",
      text: "Obed’s vision for sustainable partnerships and market growth drives Birdview’s mission forward with purpose.",
      button: "Read Obed’s Growth Vision",
      link: "/insights/obed-menjeri",
    },
  },
  {
    name: "Esdor Yahuma",
    slug: "esdor-yahuma",
    role: "Assistant Business Development Manager",
    category: "Executive Leadership",
    bio: "Esdor Yahuma is an experienced professional in the microinsurance sector, bringing over 8 years of expertise in business development and inclusive insurance solutions. He holds a Bachelor of Commerce degree and a Diploma in Business Administration. He is currently advancing his professional qualifications through the Diploma in Insurance and the Chartered Institute of Marketing (CIM). Esdor is passionate about expanding access to insurance for underserved communities and plays a key role in driving strategic growth at Birdview Insurance.",
    image: "/assets/managementPhotos/Esdor-Yahuma.png",
    cta: {
      title: "Expanding Inclusive Insurance Access",
      text: "Esdor’s passion for inclusive insurance drives innovation and outreach to underserved communities.",
      button: "Explore Esdor’s Mission",
      link: "/insights/esdor-yahuma",
    },
  },
  // {
  //   name: "Kevin Osiga",
  //   slug: "kevin-osiga",
  //   role: "Underwriting Manager",
  //   category: "Executive Leadership",
  //   bio: "Kevin Osiga oversees underwriting operations with precision and a commitment to efficiency. His leadership ensures risk is managed effectively while maintaining client trust and operational excellence.",
  //   image: "/assets/managementPhotos/Kevin-Osiga.png",
  //   cta: {
  //     title: "Redefining Underwriting Excellence",
  //     text: "Kevin’s focus on precision and efficiency ensures strong risk management and sustainable business performance.",
  //     button: "Learn About Kevin’s Approach",
  //     link: "/insights/kevin-osiga-underwriting",
  //   },
  // },
  {
    name: "Ann Kinyanjui",
    slug: "ann-kinyanjui",
    role: "Diaspora Business Development Manager",
    category: "Executive Leadership",
    bio: "Ann Kinyanjui holds a Bachelor of Arts in Economics and Mathematics from the University of Nairobi and has recently earned a Certificate of Proficiency in Insurance from the College of Insurance. She is also pursuing ongoing professional development in banking and data analytics to enhance her expertise further.",
    image: "/assets/managementPhotos/Ann-Kinyanjui.png",
    cta: {
      title: "Strengthening Diaspora Engagement",
      text: "Ann’s data-driven and community-focused approach empowers Birdview’s diaspora business growth.",
      button: "Read Ann’s Diaspora Vision",
      link: "/insights/ann-kinyanjui",
    },
  },
  {
    name: "Dr. Alice Oloo",
    slug: "alice-oloo",
    role: "Senior Strategic Advisor",
    category: "Advisory Council",
    bio: "Dr. Oloo brings over two decades of strategic advisory experience, empowering teams to align mission with measurable impact. Her global perspective nurtures innovation and inclusive growth.",
    image: "/assets/managementPhotos/Richard-Muiru.png",
    cta: {
      title: "Global Strategy for Local Impact",
      text: "Dr. Oloo’s insights continue to shape strategy frameworks that empower growth and positive societal transformation.",
      button: "Discover Dr. Oloo’s Strategy Playbook",
      link: "/insights/alice-oloo",
    },
  },
  {
    name: "John Mwangi",
    slug: "john-mwangi",
    role: "Financial Consultant",
    category: "Advisory Council",
    bio: "John is a seasoned financial strategist recognized for his data-driven approach to risk and investment management. His insights continue to strengthen the firm’s long-term value creation.",
    image: "/assets/managementPhotos/Obed-Menjeri.png",
    cta: {
      title: "Building Sustainable Financial Futures",
      text: "John’s leadership in investment planning and risk optimization helps shape resilient corporate foundations.",
      button: "Explore John’s Financial Perspectives",
      link: "/insights/john-mwangi",
    },
  },
];

export default function LeaderProfilePage() {
  const { slug } = useParams();
  const [leader, setLeader] = useState<any>(null);

  useEffect(() => {
    const found = allLeaders.find((l) => l.slug === slug);

    setLeader(found);
  }, [slug]);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);

  if (!leader) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-white text-xl">
        Leader not found.
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-800 dark:text-white transition-colors duration-700">
      {/* ✨ Floating gradient orbs */}
      <motion.div
        className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-600/40 to-red-600/30 rounded-full blur-3xl opacity-60"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute bottom-10 right-1/3 w-96 h-96 bg-gradient-to-r from-red-600/30 to-blue-500/30 rounded-full blur-3xl opacity-50"
        style={{ y: y2 }}
      />

      {/* 🪞 Leader Profile Card */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 md:p-16"
        initial={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="max-w-3xl w-full backdrop-blur-2xl bg-white/60 dark:bg-white/10 border border-gray-200/60 dark:border-white/20 shadow-2xs rounded-3xl overflow-hidden">
          <CardHeader className="relative w-full h-80 md:h-96 overflow-hidden flex justify-center items-center bg-gradient-to-b from-gray-100 dark:from-gray-900">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden ring-8 ring-white/40 dark:ring-white/10 shadow-2xl">
              <Image
                fill
                priority
                alt={leader.name}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                src={leader.image}
              />
            </div>
          </CardHeader>

          <CardBody className="p-10 text-center space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {leader.name}
              </h1>
              <p className="text-lg text-primary font-medium">{leader.role}</p>
            </div>

            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2 }}
            >
              {leader.bio}
            </motion.p>

            {/* 🔗 Back CTA */}
            <div className="pt-6 flex justify-center">
              <Link href="/our-leadership">
                <motion.div
                  className="group flex items-center gap-2 text-primary dark:text-white border border-primary/30 dark:border-white/30 rounded-xl px-5 py-3 hover:bg-primary/10 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to Leadership</span>
                </motion.div>
              </Link>
            </div>
          </CardBody>
        </Card>

        {/* 💫 Personalized CTA */}
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-20 max-w-4xl w-full text-center bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-red-600/20 dark:from-blue-700/30 dark:to-red-700/20 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-600 mb-6">
            {leader.cta.title}
          </h2>
          <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
            {leader.cta.text}
          </p>
          <Link href={leader.cta.link}>
            <motion.div
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-red-600 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              {leader.cta.button}
              <motion.div
                className="flex"
                initial="rest"
                variants={{
                  rest: { x: 0 },
                  hover: { x: 6 },
                }}
                whileHover="hover"
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
