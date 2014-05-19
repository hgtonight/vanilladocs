---
title: Setting up SSL (https)
layout: page
categories: ["Features","SSL"]
---

## Setting up SSL (https) with Vanilla Cloud

Vanilla includes SSL support in corporate and above plans. In order to enable SSL you'll have to provide Vanilla with the following:

1. The **SSL Certificate** for your forum's domain in PEM format.
2. The **SSL Certificate Private Key** for your forum's domain in PEM format.

### How to obtain your SSL certificates

Usually, you'd get an SSL certificate in one of two ways:

1. Ask an IT professional at your company. They should know exactly what an SSL certificate is and can coordinate sending a certificate to Vanilla's cloud support.

2. Obtain a new SSL certificate through a certificate authority. Companies like Verisign and TRUSTe act as certificate authorities and you can purchase an SSL certificate through them. Explaining the entire process of purchasing your own SSL certificate is going to be different for each vendor and is beyond the scope of this documentation. We recommend contacting the support of a certificate authority vendor to get more information on purchasing a new SSL certificate.

#### Why can't Vanilla create an SSL certificate for your site?

The SSL process would be much smoother if Vanilla could just set it up without requiring anything from you. This just isn't possible though due to the underlying security of SSL and the Internet. **The owner of a domain name is the only person that can generate an SSL certificate.** And if you think about it, this is a good thing. If we could generate an SSL certificate for you then so could a hacker.

### How to give SSL certificates to Vanilla

Once you have your SSL certificates you'll need to give them to Vanilla support. **Don't just email your SSL certificates to us.** These certificates are sort of like passwords and special care should be taken to provide them to us in a secure way. Here are some options.

1. **Secure FTP (sftp)**. If you've been given an sftp site with Vanilla then you can upload your certificates there.
2. **Encrypted Email**. If you have the ability to send encrypted email then you can send your SSL certificates that way. Please send them to: ops@vanillaforums.com. Our public key is:

### SSL only sites

If you have a strict security policy that requires that your site only be served through https we can configure your site to always use ssl. We don't recommend forcing SSL during the set up process in order to help us troubleshoot any issues with the configuration process.

### Gotchas

* When your site is being served through SSL you could encounter problems if you are externally linking to non-SSL resources such as javascript. Keep this in mind if you are custom theming your site or have other customizations enabled.
* If you are using jsConnect make sure your authentication url is SSL or else jsConnect will fail.
* Don't give us a wildcard certificate. Usually you set up Vanilla as a subdomain of your main site (ex. forums.yoursite.com). Make sure you generate certifictes just for the forums and not a wildcard certificate that can be used for your entire domain.
