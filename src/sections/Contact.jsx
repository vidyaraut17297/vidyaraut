import React from 'react';
import Card from '../components/Card';
import { contactInfo } from '../utils/constants';
import { contactIcons } from '../utils/icons';
import useScrollAnimation from '../hooks/useScrollAnimation';

const ContactSection = () => {
  const sectionRef = useScrollAnimation({
    from: { y: 50, opacity: 0, scale: 0.95 },
    to: { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' },
    trigger: null,
    start: 'top 80%',
    once: true,
  });

  return (
    <section id="contact" className="py-xl alt-bg" ref={sectionRef}>
      <div className="container">
        <h1>Contact Information</h1>
        <div className="contact-card-grid">
          <Card className="contact-card" variant="elevated" hover={false}>
            <p style={{ marginBottom: '1.2rem' }}>
              Feel free to reach out via email or connect on social media.
            </p>
            <div className="contact-row">
              <span
                className="contact-icon"
                dangerouslySetInnerHTML={{ __html: contactIcons.email }}
              />
              <span>
                <strong>Email</strong>
                <br />
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </span>
            </div>
            <div className="contact-row">
              <span
                className="contact-icon"
                dangerouslySetInnerHTML={{ __html: contactIcons.phone }}
              />
              <span>
                <strong>Phone</strong>
                <br />
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}>
                  {contactInfo.phone} (Phone &amp; WhatsApp)
                </a>
              </span>
            </div>
            <div className="contact-row">
              <span
                className="contact-icon"
                dangerouslySetInnerHTML={{ __html: contactIcons.address }}
              />
              <span>
                <strong>Location</strong>
                <br />
                <span title="India" style={{ fontSize: '1.2em' }}></span>{' '}
                {contactInfo.address}
              </span>
            </div>
            <div className="contact-row">
              <span
                className="contact-icon"
                dangerouslySetInnerHTML={{ __html: contactIcons.linkedin }}
              />
              <span>
                <strong>Follow Me on LinkedIn</strong>
                <br />
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/vidyaraut17
                </a>
              </span>
            </div>
          </Card>
          <Card className="contact-card" variant="elevated" hover={false}>
            <h3>Send a Message</h3>
            <form
              className="contact-form"
              name="contact"
              method="POST"
              data-netlify="true"
            >
              <input type="text" name="name" placeholder="Your Name" required />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                required
              ></textarea>
              <button type="submit" className="btn">
                Send
              </button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
