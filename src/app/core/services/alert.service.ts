import { Injectable } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private notifications: NotificationsService) {}

  private add(
    type: NotificationType,
    title: string,
    description: string,
    timeOut = 5000,
    isFilled = false
  ) {
    const notification = this.notifications.create(title, description, type, {
      timeOut,
      showProgressBar: true,
      theClass: isFilled ? '' : 'outline',
    });
  }

  addInfo(
    title: string,
    description: string,
    timeout?: number,
    isFilled?: boolean
  ): void {
    this.add(NotificationType.Info, title, description, timeout, isFilled);
  }

  addSimple(
    title: string,
    description: string,
    timeout?: number,
    isFilled?: boolean
  ): void {
    this.add(NotificationType.Bare, title, description, timeout, isFilled);
  }

  addWarning(
    title: string,
    description: string,
    timeout?: number,
    isFilled?: boolean
  ): void {
    this.add(NotificationType.Warn, title, description, timeout, isFilled);
  }

  addError(
    title: string,
    description: string,
    timeout?: number,
    isFilled?: boolean
  ): void {
    this.add(NotificationType.Error, title, description, timeout, isFilled);
  }

  addSuccess(
    title: string,
    description: string,
    timeout?: number,
    isFilled?: boolean
  ): void {
    this.add(NotificationType.Success, title, description, timeout, isFilled);
  }

}
