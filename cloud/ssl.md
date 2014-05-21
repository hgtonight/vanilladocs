---
title: Setting up SSL (https)
layout: page
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

mQENBFN8vQoBCADnosskImvLPW8GAEw78CKZmwsOChZk0uESR+o1CLTeouLurU6C
MusvvhRkcdgaeEdvx01ynFncntCkprJpzbtCojEUGSIUDjuAa9xQ+6GXipZxibdb
jelHn8tOzkmabXbzvEp7je1bvdG3y6Q33yv1oIkXzSG95lpNaBXVJSLzqZgtox18
0PRqUfwU8jv1/RaUefYUTENDsN4CdlNeLg7DYenqyg8f1xQvhFJWWY6WkdxmLrDm
7CCdST5q6tXZmetkMUx0ggxe9bL5PXz7cOO120JqF9FMvsilO37UicL36bxX0pnU
ZgTbk+NvDgsElgViiOONbucZ0CJq4dLjFmntABEBAAG0RFZhbmlsbGEgT3BlcmF0
aW9ucyAoVmFuaWxsYSBPcGVyYXRpb25zIFRlYW0pIDxvcHNAdmFuaWxsYWZvcnVt
cy5jb20+iQE9BBMBCgAnBQJTfL0KAhsDBQkHhh+ABQsJCAcDBRUKCQgLBRYCAwEA
Ah4BAheAAAoJEFdr5EjBpxgwyMsH/jxMqCk18JXxjwEjJjgUBK59P5vszu1JqBtx
rxJupnj35DJLu+zR5aWaqMTBVzv7bfYuPR9PGa6FltM1bGI2fk8WslEsyA/1vgjz
Oou6oc+R1RnW3yr6y2TsRSDx3qSbRGd+ga5yrk4OtMvVK09N9CuvIcgdq1yzfRb2
D9QfvxLVLMCIomY/lWgAIzmThRy04/Cw9xBkvHyEJvYI1pRPCf/xk8Icbwi49Bsv
IyQWhozmMMbzeBrGx+nb8r/o7Nv24PGHc2QzEudGktNnd3k9WfkEQ69PrjgiuNbK
mR0QQb0RUNBOeGn2Ltrxr1TtducdRnvbP9jeipscCBvbqO4sgju5AQ0EU3y9CgEI
AMUM1WzpjXtFH1YvbnObfiMLCZW1XoLBUVA9u1dD5kD4n/XEsAcSFyZ4+nBKJvy9
gICRWLY82oySrw42eCr5rhog12BNMqW0yqme60qlINChu86qzx2ibGcVORk1wMRg
NDOmu79Aq6azhE7npHwiRDEDx3GrTyT9HgqzySR+eujDYitCs66OOBjafXrYM+U0
uN3NoGzJtj15A+SmqtoysZUPC5lkHqzKrZVD3SrRTWr+1ahklQQmZPYDhWUfO1sz
yGtKdYdUIaTySYrc3T0cZNAROXSre2tRYKWRYaTZzNyu99CBE1PR4YiUqiVBPSQF
av7WebC9wM/q7pC+qd4xOD0AEQEAAYkBJQQYAQoADwUCU3y9CgIbDAUJB4YfgAAK
CRBXa+RIwacYMMdAB/oDHDVGjPjGZSdhy3pVA65B+t0o8UdSLQwmMo1VM8BvaMqk
acqs5WUnjz3uk5ik1IN6A6ZKLbgH38DbovCGgFxqDr0gHX6LFZjdHgBDFJyJEn4J
or/vC50Vt4umKIUuwL2RTgMqSAzk3y6wXgQMY+ch3fGv0Zg6KIcP4RSKO4HSuB71
+2pLw+Eq+AFiAqSmrzd40yYtB/+mjXUMf3Nu0nptfftxUmOiHyDRRwehwHiXxYfR
CrEpviGiuM679h+Ed7hSrS+COK+VJPt3HmZfmlvI8uimMD9HjWxDZava2HmiAqJr
iUQOvO9ttzlGCMpsm21HVxjmreHvto9TMJcReeyG
=rkOa
-----END PGP PUBLIC KEY BLOCK-----
```

### SSL only sites

If you have a strict security policy that requires that your site only be served through https, we can configure your site to always use ssl. We don't recommend forcing SSL during the set up process in order to help us troubleshoot any issues with the configuration process.

### Gotchas

* When your site is being served through SSL you may encounter problems if you are externally linking to non-SSL resources such as javascript, css, or images. Keep this in mind if you are custom themeing your site or have other customizations enabled.
* If you are using jsConnect, make sure your authentication url is available over SSL or else jsConnect will fail.
* Don't give us a wildcard certificate. Usually you should set up Vanilla as a subdomain of your main site (ex. forums.yoursite.com). Make sure you generate certificates just for the forums and not a wildcard certificate that can be used for your entire domain. This is for your own security and serves to reduce your risk and our liability.
