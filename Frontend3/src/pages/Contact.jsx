import React, { useState, useContext } from 'react'
import { FiPhone, FiMail, FiMapPin, FiSend } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { authDataContext } from '../Context/AuthContext'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
})

function Contact() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  
  const { serverUrl } = useContext(authDataContext)
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data) => {
    setSubmitting(true)
    setError('')
    
    try {
      const result = await axios.post(serverUrl + '/api/contact/submit', data, {
        withCredentials: true
      })
      
      setSubmitted(true)
      reset()
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send message. Please try again later.'
      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Header Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question or want to learn more about our vehicles? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Reach out to us through any of the following channels. Our team is ready to assist you with your vehicle needs.
                </p>
              </div>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <FiPhone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-400">07851 386 785</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Mon - Sat, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <FiMail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400">info@imkautos.co.uk</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">Location</h3>
                    <p className="text-gray-600 dark:text-gray-400">151-157 Huddersfield Road</p>
                    <p className="text-gray-600 dark:text-gray-400">Oldham, Greater Manchester</p>
                    <p className="text-gray-600 dark:text-gray-400">OL1 3PA</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Visit us at our showroom</p>
                  </div>
                </div>
              </div>

              {/* Why Choose Section */}
              <div className="mt-12 p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Why Choose IMK Autos?
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li>✓ Expertise in Imports & Compliance</li>
                  <li>✓ Quality Assurance & Inspection</li>
                  <li>✓ Customer-Focused Service</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Send Us a Message
                </h2>

                {submitted && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <p className="text-green-700 dark:text-green-300 font-medium">
                      ✓ Thank you! Your message has been sent. We'll get back to you soon.
                    </p>
                  </div>
                )}

                {error && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-700 dark:text-red-300 font-medium">
                      ✗ {error}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="john.doe@example.com"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Phone (Optional) */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Phone Number <span className="text-gray-500">(Optional)</span>
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="07851 386 785"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Subject *
                    </label>
                    <input
                      {...register('subject')}
                      type="text"
                      placeholder="Inquiry about vehicle availability"
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={6}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full gradient-primary text-white font-semibold text-lg px-8 py-4 rounded-lg hover:opacity-90 transition-all disabled:opacity-70 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 gradient-primary bg-clip-text text-transparent">
                IMK Autos (UK) Ltd
              </h3>
              <p className="text-gray-400">
                Your trusted source for premium Japanese imports and UK vehicles.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/" className="hover:text-white transition-colors">Home</a>
                </li>
                <li>
                  <a href="/product" className="hover:text-white transition-colors">Inventory</a>
                </li>
                <li>
                  <a href="/about" className="hover:text-white transition-colors">About Us</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Japanese Imports</li>
                <li>UK Vehicles</li>
                <li>Sports Cars</li>
                <li>Luxury SUVs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@imkautos.co.uk</li>
                <li>Phone: 07851 386 785</li>
                <li>151-157 Huddersfield Road</li>
                <li>Oldham, Greater Manchester OL1 3PA</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 IMK Autos (UK) Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Contact
