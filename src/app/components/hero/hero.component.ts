import {
  Component,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroSection') heroSection!: ElementRef<HTMLElement>;
  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    const mm = gsap.matchMedia();

    this.ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

        tl.to('.hero__label', { opacity: 1, duration: 0.5 }, 0.3)
          .to('.hero__name-main', { opacity: 1, duration: 0.8, y: 0 }, 0.5)
          .to('.hero__name::before, .hero__name::after', { opacity: 0.08 }, 0.8)
          .to('.hero__role', { opacity: 1, y: 0, duration: 0.6 }, 0.9)
          .to('.hero__tagline', { opacity: 1, y: 0, duration: 0.5 }, 1.15)
          .to('.hero__stats', { opacity: 1, y: 0, duration: 0.5 }, 1.3)
          .to('.hero__scroll', { opacity: 1, duration: 0.5 }, 1.6);
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(
          '.hero__label, .hero__name-main, .hero__role, .hero__tagline, .hero__stats, .hero__scroll',
          { opacity: 1 }
        );
      });
    }, this.heroSection.nativeElement);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
