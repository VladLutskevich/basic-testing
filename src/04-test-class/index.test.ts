/* eslint-disable prettier/prettier */
import { BankAccount, getBankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError } from '.';

const initialBalance = 100;

describe('BankAccount', () => {

  let account: BankAccount;
  let transferToAccount: BankAccount;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
    transferToAccount = getBankAccount(initialBalance);
  });

  test('should create account with initial balance', () => {
    expect(account).toBeInstanceOf(BankAccount);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(initialBalance + 10)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => account.transfer(initialBalance + 10, transferToAccount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => account.transfer(initialBalance, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const amount = 10;
    transferToAccount.deposit(amount);
    expect(transferToAccount.getBalance()).toBe(initialBalance + amount);
  });

  test('should withdraw money', () => {
    const amount = 10;
    account.withdraw(amount);
    expect(account.getBalance()).toBe(initialBalance - amount);
  });

  test('should transfer money', () => {
    const amount = 10;
    account.transfer(amount, transferToAccount);
    expect(account.getBalance()).toBe(initialBalance - amount);
    expect(transferToAccount.getBalance()).toBe(initialBalance + amount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const amount = 10;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(amount);

    const fetchedBalance = await account.fetchBalance();
    expect(typeof fetchedBalance).toBe('number');
    expect(fetchedBalance).toBe(amount);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 100;
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(balance);

    await account.synchronizeBalance();
    expect(account.getBalance()).toStrictEqual(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    
    await expect(account.synchronizeBalance()).rejects.toThrowError(SynchronizationFailedError);
  });
});
