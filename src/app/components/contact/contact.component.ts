import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CONTACT_DATA } from '../../data/timeline.data';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('contactSection') contactSection!: ElementRef<HTMLElement>;
  data = CONTACT_DATA;
  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    const mm = gsap.matchMedia();

    this.ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: this.contactSection.nativeElement,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
          defaults: { ease: 'power2.out' },
        });

        tl.to('.contact__label', { opacity: 1, duration: 0.4 })
          .to('.contact__title', { opacity: 1, y: 0, duration: 0.5 }, 0.15)
          .to('.contact__text', { opacity: 1, duration: 0.4 }, 0.3)
          .to('.contact__links', { opacity: 1, y: 0, duration: 0.5 }, 0.4)
          .to('.contact__footer', { opacity: 1, duration: 0.4 }, 0.6);
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          '.contact__label, .contact__title, .contact__text, .contact__links, .contact__footer',
          { opacity: 1 }
        );
      });
    }, this.contactSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
