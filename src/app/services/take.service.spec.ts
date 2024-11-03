// import { TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';
import { TakeService } from './take.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('TakeService', () => {
  let service: TakeService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      post: jest.fn()
    };
    service = new TakeService(httpClientSpy);
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(TakeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should test getDataV1 ', () => {
    const response = "Munsif";
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
    service.getDataV1();
    expect(httpClientSpy.get).toHaveBeenCalled();
    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get).toHaveBeenCalledWith(url);
  });

  it('should test getDatav2', (done) => {
    const response = "Munsif";
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(of(response));
    service.getDataV2().subscribe(
      {
        next: data => {
          expect(data).toEqual(response);
          done();
        },
        error: error => console.log(error)
      }
    );
  });

  it('should test getDatav2 error', (done) => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found'
    });
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    jest.spyOn(httpClientSpy, 'get').mockReturnValue(throwError(() => errorResponse));
    service.getDataV2().subscribe(
      {
        next: data => {
          console.log(data);
        },
        error: error => {
          expect(error.message).toContain('test 404 error');
          done();
        }
      }
    );
  });

  it('should test postDataV1', () => {
    const command = 'testing';
    const expectedResponses = "Munsif";
    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    jest.spyOn(httpClientSpy, 'post').mockReturnValue(of(expectedResponses));
    service.postDataV1(command);

    expect(httpClientSpy.post).toHaveBeenCalled();
    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
  });


  //testing handle error function
  it('should test getDatav2 error', () => {
    const handleErrorSpy = jest.spyOn(service as any, "handleError")
    service['handleError']();
    expect(handleErrorSpy).toHaveBeenCalled();
  });
});
