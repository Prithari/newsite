import createTag from '../../utils/tag.js';

const extractCustomerInfo = (detailContainer) => {
  const icon = detailContainer.querySelector('img');
  const cta = detailContainer.querySelector('a');
  cta.classList.add('button', 'secondary');
  const titles = detailContainer.querySelectorAll('h5');

  let titlesHTML = '';
  titles.forEach((title) => {
    titlesHTML += `<h5> ${title.innerHTML} </h5>`;
  });
  const titlesDiv = createTag('div', {
    class: 'titles',
  }, titlesHTML);

  const customerInfo = createTag('div', {
    class: 'customer-info',
  }, '');
  customerInfo.append(icon, titlesDiv, cta);

  return customerInfo;
};

export default function decorate(block) {
  [...block.children].forEach((row) => {
    [...row.children].forEach((div) => {
      const picture = div.querySelector('picture');
      const hasTitle = div.querySelector('h1,h2,h3,h4,h5,h6');

      if (hasTitle) {
        div.classList.add('info-side');
        // restyle for marquee.testimonial
        if (block.classList.contains('testimonial')) {
          const description = div.querySelector('h4');
          const customerInfo = extractCustomerInfo(div);
          const statistics = div.querySelector('ul');

          const testimonial = createTag('div', {
            class: 'testimonial-info',
          }, '');
          testimonial.append(description, customerInfo, statistics);
          div.replaceWith(testimonial);
        }
      } else if (picture) {
        div.classList.add('image-side');
      }
    });
  });
}
