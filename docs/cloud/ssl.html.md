---
title: Setting up SSL (https)
layout: docs
categories: ["Features","SSL"]
---

## Setting up SSL (https) with Vanilla Cloud

Vanilla offers SSL support in Corporate plans and above. In order for us to to enable SSL for your forum, you will need to provide Vanilla with the following:

```
Certificates start like this:
-----BEGIN CERTIFICATE-----
```

```
Private keys start like this:
-----BEGIN RSA PRIVATE KEY-----
```

1. The **SSL Certificate** for your forum's domain in PEM format.

2. The **SSL Certificate Private Key** for your forum's domain in PEM format, and with **no password**.

3. The optional **Intermediate SSL Certificate** for your certificate issuing authority.

### How to obtain your SSL certificates

Usually, you'll get an SSL certificate in one of two ways:

1. **Ask an IT professional at your company**. They should know exactly what an SSL certificate is and can coordinate sending a certificate to Vanilla's cloud support. Showing them this documentation will also help.

2. **Obtain a new SSL certificate through a Certificate Authority**. Companies like Verisign and TRUSTe act as Certificate Authorities (CA) and you can purchase an SSL certificate through them. Explaining the entire process of purchasing your own SSL certificate is going to be different for each vendor and is beyond the scope of this documentation. We recommend contacting the support channel of a CA to get more information on purchasing a new SSL certificate.

#### What is this "Intermediate SSL Certificate"?

SSL has 2 components: trust and encryption. Encryption is fairly straightforward: the certificate is used to encrypt communication between the client and the server. Trust, on the other hand, is more complex. Web browsers are pre-configured to "know" about a certain set of CAs, but if your certificate was issued by a CA that is not in that list, your browser does not know whether it can be trusted. The intermediate certificate solves that problem by connecting the broken chain between your certificate and a CA that the browser trusts. Intermediate certificates are an important part of ensuring that customers see a green "Secure" symbol in their address bar when they access your site.

#### Why can't Vanilla create an SSL certificate for your site?

The SSL process would be much smoother if Vanilla could just set it up without requiring anything from you. This just isn't possible though due to the underlying security of SSL and the Internet. **The owner of a domain name is the only person that can generate an SSL certificate.** And if you think about it, this is a good thing. If we could generate an SSL certificate for you then so could a hacker.

### How to give SSL certificates to Vanilla

Once you have your SSL certificates you'll need to give them to Vanilla support. **Don't just email your SSL certificates to us.** These certificates are sort of like passwords and special care should be taken to provide them to us in a secure way. Here are some options.

1. **Secure FTP (sftp)**. If you've been given an SFTP account on Vanilla's project server, then you should upload your certificates there.

2. **PGP Encrypted Email**. If you have the ability to send PGP encrypted email then you can send your SSL certificates that way. Please send them to: ops@vanillaforums.com. Our public key is included in this documentation.

  ```
  -----BEGIN PGP PUBLIC KEY BLOCK-----
  Version: GnuPG/MacGPG2 v2.0.20 (Darwin)
  Comment: GPGTools - https://gpgtools.org

  mQENBFPyN58BCACsNA8GfJcf9fKtZBuPj/UtrBB0ZxPNDKxzWQDmW/XPPKJnk6ow
  jJyzTY4FWdladmpIIVjaVvklak2efsIOFneXtcUPTAR1YHNuH0QC33pR71tFEaAt
  Rif8y+gSzY56JsL+V6M7or54de30ga/jsUA/T4dNPefeOwkeeCvZVfO+x5yxSyMA
  FxgRoMzsVXKk9RXPZ63yWrP9f7H4rSOSOQBeRZZRoro/NALC/ofiVjCF3vHf+UVQ
  juypgBZ4yeFP9dkYD9wNxPfo0/6VF6qGcPyounMfD/KTB4KxFr0b9J0kIpvizbwr
  D8Rs94ymy6HBeja62k6KB99AaGimnKihy8bJABEBAAG0RFZhbmlsbGEgT3BlcmF0
  aW9ucyAoVmFuaWxsYSBPcGVyYXRpb25zIFRlYW0pIDxvcHNAdmFuaWxsYWZvcnVt
  cy5jb20+iQE9BBMBCgAnBQJT8jefAhsDBQkHhh+ABQsJCAcDBRUKCQgLBRYCAwEA
  Ah4BAheAAAoJEA7WO3j77OtTECYH/1iaQM1496iq9rRCUs7x3WS4W4s6/u3LLYn2
  B5V1cK6g+PB5YFpp1soNEp8WGSIYZCEC0xOoexc0A4HRjgFgQcS5R1/y239SBCgI
  qTIC/gb+zTulHU7M16qxJHAiqwXleDsjjOs1TkyYv/2tHbfTJpC1V3jqwUhNVA9i
  uuU5X8zhjrPxrla9PYPv0zKOW0JoCBLtQra1bq8QVT9QgMEeWE+U8+65aBSHZ5KU
  kFglGK74HW8CygY1VbxR+ZXmy7bf3IOL2gOMined8ZzKNH4tZpSxdTKiVJhiHU7Z
  abnh5GSFnZ1qEPSH9SguZ9RTS7XDSslB7abJdgkz6eu4wYGPPyq5AQ0EU/I3nwEI
  AKdfVRb2QdEzA9ZmY4c3IXXcdYfwbvNNYZofnGo+tFr8z8SkAQy5x2oQmOzdKEek
  Q0JCUH58m5B1Od68oNpLKH8R6f96AFn1FPPszx0Magt0CBO8TSW3miHKpX5jULh0
  cHvp8QTP0v1sz2xPrf6q7JdNoPK+ZuPP7Xyp7mBJmCoMKbUHMwlCfe/g0SVylx6Z
  OtAHXXvBtENyTrmyRK1xU4k134KxvPENt6uQKYLvb7YdcMo87YtIkmTQXz5MctMQ
  ULkjrn36ZBG4n/V24so2ICagzNLnr1gHdhs8aWoJFR+bbH2ACSb+Qp/r4dGYMKxt
  HuQ0OUeWq4nQ/Tp6ktYwLYEAEQEAAYkBJQQYAQoADwUCU/I3nwIbDAUJB4YfgAAK
  CRAO1jt4++zrU8kqCACOq2ULHy54Q7oH3X2o2VymEY6no4TgIG4XH5LkEiP7iuPo
  s2lRuI/A6LbAGzVHknMPK7vpa/l3RRKAveMZI51x/xgSAh2QDlzIQ8dWjEtHl8tp
  DQsjdgMAIUddCNWccUr9j4muaDmfDh6FWgM5oFc5njkEJnym3HF8iG/+RiK2iZlD
  WZI+KUnOapX1TlnqxelpgPhXNaH1LJNlxHvWX3rv797TCak7PghVYLK1QMLINvN9
  aEoSTJ85+OncmkVaBShieQRS4ej53yCmFIn40k9+yxHLknr6aOyGmY/HWvHZdD3H
  lfmfjybE4yzQ/UKDFofZ0Xli7K595yHlgdJiTGqy
  =btdZ
  -----END PGP PUBLIC KEY BLOCK-----
  ```

### SSL only sites

If you have a strict security policy that requires that your site only be served through https, we can configure your site to always use ssl. We don't recommend forcing SSL during the set up process in order to help us troubleshoot any issues with the configuration process.

### Gotchas

* When your site is being served through SSL you may encounter problems if you are externally linking to non-SSL resources such as javascript, css, or images. Keep this in mind if you are custom themeing your site or have other customizations enabled.
* If you are using jsConnect, make sure your authentication url is available over SSL or else jsConnect will fail.
* Don't give us a wildcard certificate. Usually you should set up Vanilla as a subdomain of your main site (ex. forums.yoursite.com). Make sure you generate certificates just for the forums and not a wildcard certificate that can be used for your entire domain. This is for your own security and serves to reduce your risk and our liability.
* Not all CAs pro-actively provide intermediate certificates, and some CAs only provide them as secondary downloads instead of bundling them with your certificate when you download it.
