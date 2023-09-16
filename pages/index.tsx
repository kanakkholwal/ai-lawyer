import Image from "next/image";
import Link from "next/link";

import { Header, Logo, Nav, Menu, Hero, Section } from "src/layouts/home";


export default function Home() {
  return (
    <>
      <Header>
        <Nav>
          <Logo>
            <Image src="/logo-dark.png" alt="logo" width={200} height={100} />
          </Logo>

          <Menu>
            <div className="menulist">
              <Link href="#" className="item">
                Home
              </Link>
              <Link href="#" className="item">
                About
              </Link>
              <Link href="#" className="item">
                Solutions
              </Link>
              <Link href="#" className="item">
                Contact
              </Link>
            </div>
          </Menu>
          <Link href="/get-started" className="action-btn">
            Get Started
          </Link>
        </Nav>

        <Hero>
          <div className="content">
            <h1 className="heading">Legal Clarity, Simplified</h1>
            <p className="description">Crafting legal documents made easy, so you can focus on what truly matters.
            </p>
            <p className="mini-description">Experience the difference with our AI-powered legal assistant. Your path to hassle-free legal documentation begins here.
            </p>
            <div className="action">
              <Link href="/get-started" className="action-btn">
                Get Started
              </Link>
              <Link href="#" className="action-btn dull">
                Learn More
              </Link>

            </div>
          </div>
          <div className="image">
            <Image src="/assets/hero-illustration.png" alt="hero" width={500} height={500} />
          </div>
        </Hero>

      </Header>

      <Section>
        {/* <h2 className="heading">
          What We Solve ?
        </h2> */}
        <div className="content">
          <div className="image">
            <Image src="/assets/solution.png" alt="Solving Legal Complexity" width={500} height={500} />

          </div>
          <div className="text">
            <h3 className="heading">Solving Legal Complexity </h3>
            <p className="description">Navigating the labyrinth of legal documents shouldn{`'`}t be an ordeal. We simplify the process, making it accessible to all
            . No more deciphering legalese. We{`'`}re here to demystify the legal world and put you in control.
            </p>
          </div>

        </div>
      </Section>
    </>
  )
}
